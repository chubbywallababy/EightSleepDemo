# What is this doc?

- Assumptions tracked which were made during the coding process and the logic behind the assumption.
- Potential questions that might be good for an interview.

# Assumptions and potential questions

<br>

## Q

How is the sleep fitness number calculated?

## A

Currently I'm taking the average of all the available intervals.

<br>

## Q

What are some future improvements that could be made?

## A

There's a lot, but I'd start with these:

- Figure out some better way to show large amounts of aggreated data. The S3 objects only had a few days' worth of information so it made sense in my opinion to show more simple views. But with a lot of data we'd want to show something where a month's worth of progress can be viewed.
- Optimize `getSleepDetailData`: `m * n` -> `n`. More details are in the function. It doesn't make a difference with this amount of data but would make a difference with more data.

<br>

## Q

How will you structure and manage the JSON data for the sleep sessions?

## A

I put loading and error state around each of the S3 objects, and organized that within Redux. Side effects were managed using Redux-saga to fetch sleep data user right after the list was fetched. Then selectors were used to pull the data out and use it in the views.

<br>

## Q

What was the decision making process with the preemptive loading?

## A

To make each user list cell more informative, I wanted to show a few KPI's. In order to show relevant sleep data on the users list view, we needed to fetch each of the users info. Users will probably only want to drill down if they can see something is immediately wrong. Otherwise they'll have to drill down and analyze what's on that page. If they can instead do a quick sanity check on the family list, it provides a better UX.

The biggest issue for this is scalability - what happens when each user has 1 year's worth of sleep history? It's too much to preemptively call. This would bog down the server and client.

We would need a BE solution, something like a KPI api for each user, or another way to get a summary to display.

<br>

## Q

Could you provide more details on how you plan to implement animated data visualization and/or transitions?

## A

Here's a list of animations:

1. Animated number (family list)
2. Glow on card (family list - iOS only)
3. Progress circle (detail view - sleep fitness)
4. Progress bar (detail view)
5. Graph animations (detail view - horizontal scroll component)
6. Confetti on accepted changes (suggestion view)

Here's some more that I'd like to implement

1. Tnt count animation on next button (don't animate more than once per day)

<br>

## Q

What did you do for theming?

## A

I tried to follow the same pattern in the app - The theme is always dark regardless of user preference. I made some general utilities for theming (shared components, colors, styling).

<br>

## Q

What was done in respect to the API calls and what could be done to improve that aspect of the app?

## A

The API calls to the AWS files were done using the JS fetch API. If there was any layer of authentication, I'd implement a shared Axios instance that would keep track of tokens any anything else related to timeouts, logout logic, etc.

<br>

## Q

What is the process for reloading the users if someone gets added?

## A

This currently isn't implemented since the data is static in S3, but I'd implement the `refreshControl` and the `onRefresh` props for the `FlatList` in the `SleepersListView` component.

<br>

## Q

How do you report errors that are thrown in sagas?

## A

There's a couple ways

1. Take the error from the saga, store it in state, then read/throw it in the view so an error boundary catches it.
2. Report in the saga using a tool like sentry

Either way, we'd probably want to keep it in state to be able to relay that to the user.

<br>

## Q

Why are there separate errors and loading states on the redux sleep state (one for each user id)?

## A

It's possible that one user was fetched successfully and the others weren't. I did prefer to keep the loading/error state separate so that at least some users could be seen if another was to fail.

<br>

## Q

What if someone is getting good quality sleep according to the static util funciton breakpoints, but is not feeling rested? And vice versa, bad quality sleep and feels great?

## A

This would probably be more of a ML/AI issue, but we'd want to report it through the UI. The mocks currently have a good representation for [reporting this](https://www.figma.com/file/wDc9mTgq4Px1CKn57mNkrQ/Mobile-Eng-Take-Home?type=design&node-id=2-9337&mode=design&t=EWmPoTGtfwZwH1dF-0), so I would just implement this.

<br>

## Q

i18n?

## A

I made a basic strings file, but hopefully we can get the picture. I think I missed some strings here or there, but this wasn't on my proiority list since it wasn't mentioned in the challenge instructions.

<br>

## Q

What was your approach to testing?

## A

I wanted to get a good amount of unit tests done. Testing UI with animations can be tricky though. So as of now, all of the animations are mocked.

I like to make stub tests that check a snapshot. Because if any UI updates are made, they will have to be intentional since tests will fail. After that's set up, redux state and util functions are usually pretty easy to nail down.

A good goal for a real project is between 70% and 90%, in my opinion.

<br>

## Q

What might some good future features be to implement with family mode?

## A

- Push notifications if a family member slept poorly
- Push notifications to remind a user to sleep and customizations for that
- Sleep diary to record how they felt after each night

<br>

## Q

How was the "toss and turn" value calculated?

## A

The "toss and turn" value was calculated assuming the second number in this format represents the number of times the user "tossed and turned".

```
["2017-02-28T06:20:00.000Z", 1], // datapoint of the timeseries, in the format [time, value]
["2017-02-28T06:21:00.000Z", 2],
["2017-02-28T06:30:00.000Z", 1]
```

So I would have assumed this user would have a "tnt" value of 4. In a real-world scenario, this would have been something I'd need to clarify with product before implementing. The gist seemed pretty clear but I'd want to repeat this explicitly so I'm sure I'm not misunderstanding.

<br>

## Q

The function `getTimeToFallAsleepDataPoint` always assumes the first stage represents how long it takes for a user to fall asleep.

## A

Again, this seems fairly self explanitory. But I'd call it out before implementing, just to be safe.

<br>

## Q

Why are we using the UTC plugin?

## A

I'm assuming that the date coming through from the JSON response is accurate, but I'm not sure if that represents the users time or the server time. I chose to do this for clarity in the demo but I'd want to clarify this before implementation with the BE folks and whoever creates the data.
