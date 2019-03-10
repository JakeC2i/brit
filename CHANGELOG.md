# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2019-03-10

### Added
- "Asynchronous instantiation" implemented. To be exact, the injector only
*asynchronously waits* for the already constructed class to be marked
as ready, so it can continue it's job.

## [0.1.0] - 2019-03-10

### Added
- Project structure
- Development project, for during-development testing
- Feature: asynchronous injection via TypeScript metadata reflection
- Asynchronous instantiation at a class level is not yet implemented
