# Multiple Choice
Repository of the example using GraphQL, Relay, React, NodeJS, NextJS, Styled Components, Material UI and so on.

A great starting point for testing and playing with new features of the technologies mentioned above.

## Setup

```
yarn
```

## Server
```
yarn server:graphql
```

In your browser access localhost:5050/playground

### Queries Examples
```
query MultipleChoices {
	multipleChoices{
    totalCount
    edges {
      node {
        id
        ...multipleChoiceFragment
      }
    }
  }
}

query MultipleChoice($id: ID!) {
  multipleChoice(id: $id) {
		...multipleChoiceFragment
  }
}

fragment multipleChoiceFragment on MultipleChoice {
  id
  question
  statements
  correctAnswer
}
```

### Mutation Example
```
mutation MultipleChoiceAdd($input: MultipleChoiceAddInput!) {
  MultipleChoiceAdd(input: $input) {
    error
    multipleChoiceEdge {
      node {
        id
        question
        statements
        correctAnswer
      }
    }
  }
}
```

#### Seed data into database
```
yarn seed
```

#### Tests
```
yarn test
```
or
```
yarn server:test
```

## Web
```
yarn next:dev
```

In your browser access localhost:6060

