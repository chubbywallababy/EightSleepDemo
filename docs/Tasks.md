# What is this doc?

- A list of what items were done for the project and in what order

# Tasks

# Tuesday (before meeting with caglar8S)

- Research on Eight Sleep interview steps and found take home assessment to be part of the process - [glassdoor](https://www.glassdoor.com/Interview/Eight-Sleep-Software-Engineer-Interview-Questions-EI_IE2131100.0,11_KO12,29.htm?filter.jobTitleFTS=Software+Engineer)
- Started on a repo. Incluing some basic animations, navigation, views and components.
- Research on different data visualization libraries available in react native.

# Wednesday

- Met with caglar8S and did an analysis of the assessment requirements (the instructions were sent later in the day)

# Thursday

- Created types according to specs
- Redux and state management setup (user and sleep slices)
- Util functions and logic
- Cleaned up the UI to more closely follow the mocks
- Initial setup for the user list view

# Friday

- Initial work on the details view
- Centralize strings
- Animations for the sleeper cell and styling for bad kpi scores
- Temperature suggestion for users that have a bad kpi scores
- Circular progress
- Determine the data/types to show in the view and how to organize that
- detail view and data visualization initial steps

# Saturday

- Verified android and found two bugs

# Sunday

- Finish the detail card (remove icon button)
  - today (current value)
  - average
  - accept the correct prop
- Implement util functions to populate detail data
  - Data points for time slept
  - Data points time to fall asleep
  - Toss and turns
  - Sleep heart rate line data
- Implement remaining detail views
  - toss and turn card

# Monday

- sleep heart rate line data
- Implement suggestion view with graph and buttons
  - suggestion redux state
  - buttons
- Cleanup all the code
- Unit tests to ~60% coverage
  - redux
  - utils
  - views
- Documentation
  - Documents in the docs folder
  - document all functions/components

# Tuesday

- Sleep Stages Distribution
  - Use a pie graph!
- Sleep Environment Conditions
  - Use an area chart to display the variation in sleep environment conditions (e.g., room temperature, bed temperature) over the course of a sleep session. Time is plotted along the x-axis, and the environmental condition (e.g., temperature) is plotted along the y-axis. (use horizontal scroll)
- Respiratory rate
  - use a line graph to represent breaths per minute for a given night (use horizontal scroll)
- Verify repo works with a fresh clone
- Implement toast + confetti for accepting/rejecting suggestions
- Animation for the graphs
- Cleanup documentation

# Wednesday

- Added temperature text to the suggestion view
- Additional code cleanup
- Additional documentation cleanup

# "Nice-to-have" list

- gradient graph for temperature suggestion
- animate the dots for tosses and turns
