# Wiki

## 1 Description

Contains all webcontent that will be found on http://2018.igem.org/Team:Virginia.

## 2 Table of Contents

1. [**Description**](#1-description)
2. [**Table of Contents**](#2-table-of-contents)
3. [**Todo**](#3-todo): Fine-grained todo list. _Look here if you need something to do._
4. [**Roadmap**](#4-roadmap): Long-term task lisk. Broadly outlines what is needed to bring the wiki to completion.
  - [**Interactive**](#5-interactive): Section describing the interactive component that will be the centerpiece of our home page.

## 3 Todo

No items here right now.

## 4 Roadmap

1. [Completed] Write an upload script using igemwiki-api to push all pages, images and other content to the iGEM wiki.
2. [Completed] Create a build tool that can compile to working HTML for both the iGEM wiki and local machine testing.
3. [In progress] Decide on and implement wiki style
    - [Completed] Template should have a header and a footer that contain a snazzy navbar and team information respectively.
    - [Completed] Template should also contain styling that allows for quick development of webpages wihout needing style attributes in HTML.
    - [In progress] Ideally, template can be written in markdown and compiled to enable other team members to edit things fairly easily.
4. [In progress] Core concurrent tasks:
    - [In progress] Finish all major pages, at least with filler content
    - Code interactive for home page
    - Create a tool for the team to easily push their information to the wiki?
5. Final tasks
    - Run through the whole wiki, hosted on the iGEM website, check for inconsistencies

## 4.1 Interactive

This is an interactive presentation that gives the reader an intuition for what our device is doing. It goes fairly simply:

1. Start with an empty "petri dish" that looks like it's just part of the webpage. A little "click me" prompt gets the user to interact with it.
2. When the user clicks, they will add a single E. Coli, a CFU, to the dish
3. The user can then incubate the cell and it will divide to form a few cells
4. When the cells hit quorum, many will begin to flash a bright blue color to indicate their genes have been activated; but only about 50% will flash initially.
5. The user can then sterilize/clean the dish with a button, and switch to the Virginia iGEM quorum sensing genes
    - Maybe have a short animatic where the user transforms some bacteria
6. Upon redoing the experiment, they'll find that nearly all the bacteria flash
7. User is left to play around with the sandbox all they want. A little flashing blue arrow at the bottom of the game prompts them to scroll down to read about the project.
