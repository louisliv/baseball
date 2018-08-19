# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
    v.name = "project"
  end
  
  config.vm.box = "bento/centos-7.2"
  # config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.network :forwarded_port, guest: 80, host: 4567, host_ip: "127.0.0.1"

  # Patch for https://github.com/mitchellh/vagrant/issues/6793
  config.vm.provision "shell" do |s|
    s.inline = '[[ ! -f $1 ]] || grep -F -q "$2" $1 || sed -i "/__main__/a \\    $2" $1'
    s.args = ['/usr/bin/ansible-galaxy', "if sys.argv == ['/usr/bin/ansible-galaxy', '--help']: sys.argv.insert(1, 'info')"]
  end
  
  config.vm.provision :ansible_local do |ansible|
    ansible.playbook = "playbook.yml"
  end
end
