# app 

The application's architecture is based on the post [Angular Architecture Patterns and Best Practices (that help to scale)](https://dev-academy.com/angular-architecture-best-practices/) from Bartosz Pietrucha. 

The system is decomposed in three main abstraction layers:

![Architecture overwiew](docs/abstraction_layers.PNG)

## Presentation layer 
The only responsibilities of this layer are to present and to delegate. In other words, it presents the UI and delegates user’s actions to the core layer, through the abstraction layer. It knows what to display and what to do, but it does not know how the user’s interactions should be handled.

### components 
Each angular component has a subfolder containing three main different files:

1. `<name>.component.html`: HTML 
2. `<name>.component.scss`: styles 
3. `<name>.component.ts`: logic 


## Abstraction layer 
The abstraction layer decouples the presentation layer from the core layer and also has it’s very own defined responsibilities. This layer exposes the streams of state and interface for the components in the presentation layer, playing the role of the facade.

### facade 
We distinguish the `DataFacade`, `LabelLevelFacade` and `ParagraphLevelFacade` facades.


## Core layer 
Here is where core application logic is implemented. All data manipulation and outside world communication happen here. 

### api 
API services have only one responsibility - it is just to communicate with API endpoints and nothing else. We should avoid any caching, logic or data manipulation here. 

There are two API services: 

1. `DocumentApi`: contains all the API calls related to documents (i.e `/api/document`).
2. `UserApi`: contains all the API calls related to users (i.e. `/api/user`).


### models 
Data representations of 

- Document
- Label 
- BoundingBox
- Paragraph 

and useful interfaces

- Feature configuration 
- Fixation area (configuration)

used through the different layers of the application.


### services 
Encapsulate business logic that is not strictly related to data management or api calls. 

- `GlobalHttpInterceptorService`: intercepts and processes every HTTP error.
- `GlobalErrorHandlerService`: handles every error that is not handled by the previous one.
- `NotificationService`: shows a success (green) or error (red) message using a *slack bar*.


### state

Encapsulates the state management. To manage our state we simply use BehaviourSubjects or ReplaySubjects. Having this kind of abstraction gives us a lot of flexibility and allows to change the way we manage state without even touching the presentation layer.

There are three different states:

-  `DataState`: stores the different document data (layout, features, relevance, fixation duration).
- `LabelLevelState`: stores the the data exclusively related to the label level (fixation duration configuration, enabled).
- `ParagraphLevelState`: stores the data exclusively related to the paragraph level (features configuration, enabled).


## Others 

- `app-routing.module.ts`:  allows to add navigation to the app in the case that it is necessary.
- `app.module.ts`: imports all the necessary modules.


