# augomate

A simple static front end for an animated, two-theme, neumorphic lead generation site, extracted from a larger containerized full stack project.

The removal and modification of some features for the simpler static form may have left some discontinuities in the code. Most notably, the original contact form allowed messages to be sent through a Node.js server and a mailing list to be built in a PostgreSQL database. This backend functionality has been replaced with a use of a dynamic `mailto` and a use of the Clipboard API. Both recombine an address split in the JS to hinder scraping.

## Development plan

The following are possible next steps in the development of the code base. The longer-term aim is a generalisation of the code with an integration of the underlying logic into a simple framework for wider application. Pull requests are welcome for these and any other potential improvements.

- use if feasible in CSS a single source of truth for dark mode
- revise the CSS for improved readability and ease of extension
- refactor the JS to allow instantiation of animated components
- add form inputs and fetch for use with a static email service
