# Override the default `public/webpack` folder location to use Rails standard public/assets
Rails.application.config.webpack.output_dir = 'public/assets'
Rails.application.config.webpack.public_path = 'assets'
