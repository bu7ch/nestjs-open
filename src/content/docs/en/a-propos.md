---
title: About the course
description: Prerequisites, structure and how exercises work.
---

## Who this course is for

This course starts from zero on the backend side. It only assumes you know programming basics: variables, conditions, loops and functions, in any language.

## How it is organized

The course is split into parts, each divided into sections. Most sections end with numbered exercises (3.1, 3.2…).

Two projects move forward side by side, from part 3 to part 11:

- **In the course text**, we build the backend of an online Werewolf game: villages, role assignment, day and night cycles, votes, special role powers and chat.
- **In the exercises**, you build a B2B marketplace: vendors, catalog, cart and orders.

Both projects use the same concepts on different domains. You can't copy-paste: you have to understand in order to adapt.

Parts 0 to 2 lay the groundwork with small standalone exercises.

## Capstone projects

Part 12 takes both projects to their full version, with professional specifications: microservices, message brokers, large-scale real time, payments. You get there already knowing the domain, since you built the simple version.

## Submitting exercises

An exercises repository, `nestjs-open-exercices`, holds an empty NestJS project and the exercise tests. Fork it, build your marketplace in it as you go through the parts, and check with `npm run test:partie-N` (for example `npm run test:partie-3`). GitHub Actions runs the same tests on every push to your fork.

The tests check your API's behavior and the structure the exercises ask for, not your style. "Manual" exercises (installing, reading an error message, breaking something on purpose) are not tested: tick them yourself on the site. For each covered part, the repository also holds a solution that GitHub Actions verifies on every change: it proves the exercises are doable, and can unblock you once you have tried.

The repository follows the writing of the course: as of now, the tests cover **parts 3 to 9**. Under the exercises of later parts, no command is shown until they are covered. From part 5 on, the tests need PostgreSQL: `docker compose up -d` (or Podman) starts the repository's one.
