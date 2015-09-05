# Load DSL and Setup Up Stages
set :application, ENV['APP_NAME']
set :repo_url, ENV['APP_REPO']

# Hardcodes branch to always be master
# This could be overridden in a stage config file
set :branch, :master

set :deploytag_time_format, "%Y.%m.%d-%H%M%S-cet"

set :deploy_to, -> { "/var/www/#{fetch :application}_#{fetch :stage}" }
set :shared_path, "#{deploy_to}/shared"

# Use :debug for more verbose output when troubleshooting
set :log_level, :info

# Set time format for deploy tagging.
set :deploytag_time_format, "%Y.%m.%d-%H%M%S-cet"

# Apache users with .htaccess files:
# it needs to be added to linked_files so it persists across deploys:
# set :linked_files, fetch(:linked_files, []).push('.env', 'web/.htaccess')
set :linked_files, fetch(:linked_files, []).push('.env')

# Install Composer executable
SSHKit.config.command_map[:composer] = "php #{fetch(:shared_path)}/composer.phar"

namespace :assets do

  task :compile do
    run_locally do
      execute :gulp, '--production'
    end
  end

  task :copy do
    on roles(:web) do
      upload! 'web/assets', release_path.join('web/assets'), recursive: true
      upload! 'web/pages', release_path.join('web/pages'), recursive: true
    end
  end
  
  task deploy: %w(compile copy)

end

namespace :deploy do
  before :starting,   'composer:install_executable'
  before :updated,    'assets:deploy'
end