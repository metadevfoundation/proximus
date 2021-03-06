export PATH := ./node_modules/.bin:${PATH}

bin = node_modules/.bin
src = $(shell find -path './[elements|lib]**/*' -and -name '*.js')
css = $(shell find -path './[elements|styles]**/*' -and -name '*.css')
SHELL := bash

all: install build
.PHONY: all

install: node_modules dist/lib/flexbox.css dist/lib/browser-polyfill.min.js
	# install
.PHONY: install build serve

node_modules: package.json
	# node modules
	@ npm install
	@ touch node_modules


dist/lib/%: node_modules package.json
	# manually copying vendor
	@mkdir -p dist/lib
	@ cp -v ./node_modules/babelify/node_modules/babel-core/browser-polyfill.min.js dist/lib/browser-polyfill.min.js

# build
build: dist/app.js dist/app.css assets
	# build done.
.PHONY: build

serve:
	@$(bin)/beefy --cwd dist/
.PHONY: serve

# css
dist/app.css: $(css)
	# myth
	@$(bin)/myth styles/app.css dist/app.css

# js
dist/app.js: app.js $(src) .babelrc
	# browserify
	@$(bin)/browserify -d app.js -t babelify --outfile dist/app.js

# assets
assets:
	@ cp -rvu public/* dist/
.PHONY: assets

gh-pages:
	  cd dist && \
	  git init . && \
	  git add . && \
	  git commit -m "GH Pages"; \
	  git push "git@github.com:metadevfoundation/proximus.git" master:gh-pages --force && \
	  rm -rf .git
.PHONY: gh-pages

# clean
clean:
	rm -rf dist
	rm -rf node_modules
	npm cache clean
.PHONY: clean
