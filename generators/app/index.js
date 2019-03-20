'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the breathtaking ${chalk.red('generator-rollup-ts-lib')} generator!`)
    )

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      license: 'MIT',
      scripts: {
        commit: 'git-cz'
      }
    })
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    )
  }

  install () {
    this.yarnInstall([
      'rollup',
      'rollup-plugin-commonjs',
      'rollup-plugin-node-resolve',
      'rollup-plugin-typescript2',
      'rollup-plugin-sourcemaps',
      'jest',
      'ts-jest',
      'tslint',
      'ts-jest',
      'ts-node',
      'tslint',
      'tslint-config-prettier',
      'tslint-config-standard',
      'typedoc',
      'typescript',
      'husky',
      'lint-staged',
      'rimraf',
      'semantic-release',
      'travis-deploy-once',
      'coveralls'
    ], { 'dev': true })
    this.spawnCommand('npx',
      'commitizen init cz-conventional-changelog --yarn --dev --exact'.split(' '))
  }
}
