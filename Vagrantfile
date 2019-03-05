# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
    v.name = "connor_music_project"
  end

   ## set general project ownership, and permission
  config.vm.synced_folder './', '/vagrant',
    owner: 'vagrant',
    group: 'vagrant',
    mount_options: ['dmode=755', 'fmode=664']

  ## set general project ownership, and permission
  config.vm.synced_folder './server', '/vagrant/server',
    mount_options: ['dmode=777', 'fmode=666']
  
  config.vm.box = "bento/centos-7.2"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.provision :shell, inline: "setenforce 0", run: "always"
  config.vm.provision :shell, inline: "service httpd restart", run: "always"
  config.vm.network :forwarded_port, guest: 80, host: 4567, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 35729, host: 35729

  # Patch for https://github.com/mitchellh/vagrant/issues/6793
  config.vm.provision "shell" do |s|
    s.inline = '[[ ! -f $1 ]] || grep -F -q "$2" $1 || sed -i "/__main__/a \\    $2" $1'
    s.args = ['/usr/bin/ansible-galaxy', "if sys.argv == ['/usr/bin/ansible-galaxy', '--help']: sys.argv.insert(1, 'info')"]
  end
  
  config.vm.provision :ansible_local do |ansible|
    ansible.playbook = "playbook.yml"
  end
end
