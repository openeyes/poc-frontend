require "capistrano/ext/multistage"
require "capistrano_colors"

set :application, "openeyes"

set :keep_releases, 3 # number of deployed releases to keep
set :use_sudo, false
default_run_options[:pty] = true
set :deploy_via, :remote_cache

namespace :deploy do
  desc <<-DESC
  Does a full deploy using the tasks specified.
  DESC
  task :full do
    transaction do
      remove_cached_copy
      update_code
      # bundle
      npm_install
      bower_install
      grunt_build
      create_symlink
    end
    cleanup
  end

  desc <<-DESC
  Does a full deploy while prompting for the tag to be deployed.
  DESC
  task :tag do
    set_tag
    full
  end

  desc <<-DESC
  Removes the cached-copy folder.
  DESC
  task :remove_cached_copy do
    run("rm -rf #{deploy_to}/shared/cached-copy")
  end

  task :bundle do
    run "cd #{release_path} && bundle"
  end

  task :npm_install do
    run "cd #{release_path} && npm install"
  end

  task :bower_install do
    run "cd #{release_path} && bower install"
  end

  task :grunt_build do
    run "cd #{release_path} && grunt build"
  end

  desc <<-DESC
  DESC
  task :set_tag do
    set :branch do
      default_tag = `git tag`.split("\n").last

      tag = Capistrano::CLI.ui.ask "Tag to deploy (make sure to push the tag first): [#{default_tag}] "
      tag = default_tag if tag.empty?
      tag
    end
  end

end
