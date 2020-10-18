from pathlib import Path
from subprocess import check_output, check_call as _check_call, CalledProcessError

import json
import os
import platform
import sys
import time

APR = ["anaconda-project", "run"]

class COLOR:
    """Terminal colors
    """
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[94m'
    UNDERLINE = '\033[4m'

def check_call(cmd_args, *args, **kwargs):
    rc = _check_call(cmd_args, *args, **kwargs)
    print("", COLOR.BOLD, " ".join(args), COLOR.ENDC)
    return rc

class Bootsraper(object):
    _conda_info = None

    _default_stages = ['db', 'teams', 'ui']

    def __init__(self, stages=None):
        self.stages = self._default_stages

    def print_stage_doc(self, stage_fn):
        print(COLOR.OKBLUE, stage_fn.__doc__, COLOR.ENDC)

    def execute_stages(self):
        self.init_time = time.time()

        def print_times(label, status, color, start_time, end_time):
            print(
                color, f"\n=== {status} {label}",
                int(end_time - start_time),
                "seconds",
                "(of", int(end_time - self.init_time),
                "seconds)",
                COLOR.ENDC,
            )

            sys.stderr.flush()

        stage_count = len(self.stages)
        for i, stage in enumerate(self.stages):
            print(
                COLOR.HEADER,
                f"\n=== {stage} ({i + 1} of {stage_count}) ===",
                COLOR.ENDC
            )

            sys.stdout.flush()
            sys.stderr.flush()
            status = "OK"
            color = COLOR.HEADER

            try:
                stage_fn = getattr(self, f"prepare_{stage}")
            except Exception as err:
                print(f"!!! {stage} NOT FOUND, ABORTING !!!")
                print(err)
                sys.exit(1)

            self.print_stage_doc(stage_fn)

            start_time = time.time()

            try:
                stage_fn()
            except KeyboardInterrupt:
                status = "STOPPED"
                color = COLOR.WARNING

                sys.exit(1)
            except Exception as err:
                status = "FAIL"
                color = COLOR.FAIL
                print(f"{color}ERROR WAS:\n\t{err}{COLOR.ENDC}")
                self.print_stage_doc(stage_fn)
                sys.exit(1)
            finally:
                print_times(stage, status, color, start_time, time.time())

    def prepare_multi(self, run, cleanup=[]):
        try:
            for run_args in run:
                print(f"Running \n\t{' '.join(list(map(str, run_args)))}\n")
                check_call(run_args)
        finally:
            for clean_args in cleanup:
                try:
                    check_call(clean_args)
                except Exception as err:
                    print("...Cleanup failed", cleanup, err)

    def prepare_db(self):
        """
        Create, provision, and grant rights on the development database
        """
        self.prepare_multi([
            APR + ["db:init"],
            APR + ["db:start"],
            APR + ["db:setup"],
            APR + ["check:migrations"],
            APR + ["manage"] + ["migrate"],
            APR + ["db:grant"],
        ], cleanup=[APR + ["db:stop"]])

    def prepare_ui(self):
        """
        Install npm packages
        """

        check_call(APR + ["ui:setup"])

    def prepare_teams(self):
        """
        Populate MLB team data in the database 
        """

        self.prepare_multi([
            APR + ["db:start"],
            APR + ["populateteams"]
        ], cleanup=[APR + ["db:stop"]])

    def prepare_watson(self):
        """
        Intialize Django Watson
        """

        check_call(APR + ["watson"])

def main(stages):
    bs = Bootsraper(stages)
    return bs.execute_stages()


if __name__=="__main__":
    main(sys.argv[1:])
