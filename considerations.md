## Considerations

I have some important considerations for whoever is evaluating the test.

#### Separation of the app into layers

I separated the app into layers aiming for a cost-benefit balance between code production speed and maintainability.

#### Tests

Tests are a key part of any application, and since this is a financial application for a company dealing with global payroll, it is even more important to ensure that everything is tested (and well tested) to avoid regressions.

## Areas for Improvement

Due to the suggested time for the test, there are some improvements I would have liked to make, although I didn't have time to implement them.

#### Tests

Regarding tests, although the unit tests are satisfactory, the end-to-end tests lack complexity and integration tests for repositories are nonexistent. With more time, I would like to go back and add more tests.

#### TypeScript

Using TypeScript in this application would be beneficial, as typing would increase performance during development and help avoid common errors when dealing with untyped languages. However, since the template was sent to me in JavaScript, I was unsure whether I could/should make this change. This, coupled with the short time, led me to choose not to pursue this path.
