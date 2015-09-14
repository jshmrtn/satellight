set :stage, :staging
set :branch, :master

set :user, ENV['STAGING_USER']
set :host, ENV['STAGING_HOST']

set :deploy_to, ENV['STAGING_PATH']
set :shared_path, "#{deploy_to}/shared"

# Install Composer executable
SSHKit.config.command_map[:composer] = "php #{fetch(:shared_path)}/composer.phar"

# Simple Role Syntax
# ==================
#role :app, %w{deploy@example.com}
#role :web, %w{deploy@example.com}
#role :db,  %w{deploy@example.com}

# Extended Server Syntax
# ======================
server fetch(:host), user: fetch(:user), roles: %w{web app db}

fetch(:default_env).merge!(wp_env: :staging)