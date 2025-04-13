What is Debouncing?
Debouncing is a technique used to ensure that a function is only executed after a certain amount of time has passed since the last time the function was invoked.

In simpler terms:

“Only execute the function if the event hasn't happened again in the last X milliseconds.”

This helps prevent excessive calls to a function, especially when triggered by rapidly firing events.

Where is Debouncing Used?
Debouncing is used when you want to wait until the user finishes performing an action before triggering a function.

Real-world scenarios:

Search box auto-suggestions
When a user types into a search box, you don’t want to send a fetch request for every keystroke. Debouncing waits until the user pauses typing, then makes a single request.

Form field validation
For checking email/username availability via API, debounce the API call until the user finishes typing.

Window resize event
Resize events trigger constantly as the window is being resized. Debouncing ensures your handler runs only after the resizing is done.

Submit buttons
Debouncing prevents multiple form submissions by ignoring rapid clicks and processing only the last one.

What is Throttling?
Throttling is a technique that limits a function to be called at most once every X milliseconds, regardless of how many times the event is triggered.

In other words:

“Run the function at most once every X milliseconds, even if the event keeps firing.”

Throttling doesn’t wait for the event to stop — it just limits how often the function can be run.

Where is Throttling Used?
Throttling is useful when you want to allow a function to run repeatedly, but at a controlled rate.

Real-world scenarios:

Scroll events
When implementing infinite scrolling or animations on scroll, throttling limits how often you check the scroll position.

Mouse movement tracking
For tracking mouse position in real-time (e.g., drawing or tooltip updates), throttling limits how often the tracking function runs.

Window resizing (dynamic updates)
If your layout needs to update during resizing, throttling allows updates every few milliseconds instead of hundreds per second.

API call rate limits
If an API only allows one request every second, throttling can ensure your app doesn't exceed that limit.

Key Differences Between Debouncing and Throttling
Aspect	Debouncing	Throttling
When it runs	After a pause in event firing	At regular intervals while the event is firing
Purpose	Execute function only after user finishes an action	Execute function regularly while limiting frequency
Frequency of call	Once, after events stop	Repeatedly, but no more than once every X ms
Typical use cases	Search bars, input validation, resize-end	Scroll events, mouse move, continuous resize updates
Summary
Debouncing is best for delaying execution until an event stops occurring.

Throttling is best for limiting the rate at which a function runs during continuous events.
