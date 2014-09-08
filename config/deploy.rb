require "capistrano/ext/multistage"
require "capistrano_colors"

set :application, "openeyes"

set :keep_releases, 2 # number of deployed releases to keep
set :use_sudo, false
default_run_options[:pty] = true
set :deploy_via, :remote_cache

namespace :deploy do
  desc <<-DESC
  Does a clean deploy by removing the cached-copy folder first,
  then runs deploy.full
  DESC

  desc <<-DESC
  Does a full deploy using the tasks specified.
  DESC
  task :full do
    transaction do
      remove_cached_copy
      update_code
      bundle
      npm_install
      bower_install
      grunt_build
      update_symlink
    end
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
    run "cd #{release_path} && grunt_build"
  end

end