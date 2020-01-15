## Angularfire Repository Factory

This Angular library includes a module that provides a factory service for creating generic repositories for accessing data Firebase using AngularFire.

Often when using AngularFire you create a lot of code that is very similar. Even if you take the trouble to create a generic repository base class and derive from it to create strongly typed data access services you write a lot of code that is almost the same. Not fun and time consuming so to save time and reduce repetetive coding here is a factory that you inject and have it create a generic repository typed for the documents you want to access.

### Pre-requisites

First this library depends on AngularFire and therefore on Firebase as peer dependencies, so if you haven't already set your project up for AngularFire you will need to follow the steps at over at https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md before installing this package.

### Installation

To install this package execute the following in a terminal window focused on your project

```bash
npm install @testpossessed/angularfire-repo-factory
```

Now somewhere, usually in app.module.ts you need to import AngularFireRepoFactory something like this

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireRepoFactoryModule } from '@testposssessed/angularfire-repo-factory'; // import the module
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
        AngularFirestoreModule,
        AngularFireRepoFactoryModule // provides the AngularFireRepoFactory service
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

### Usage

Once you have the module imported into your application you can inject the service into any component or service and use it to create a repository

```ts
...
import { AngularFireRepoFactory } from '@testposssessed/angularfire-repo-factory';

...

@Component({...})
export class MyComponent {

  constructor(private angularFireRepoFactory: AngularFireRepoFactory) {}

  doStuff() {

    // get a repository for a ToDo type stored in a todos collection
    const repo = this.angularFireRepoFactory.create<ToDo>('todos');

    // add a new todo
    const toDo: ToDo = {
      title: 'title',
      description: 'description',
      done: false
    }

    // using asnc/await
    toDo = await repo.add(toDo);
    // do something result that now has an id

    // or
    // using promise
    repo.add(toDo).then(d => {
      // do something with the result that now has an id
    });

    // update the todo
    toDo.done = true;

    // using async/await
    toDo = await repo.update(toDo);
    // do something with updated item


    // or
    // using promise
    repo.update(toDo).then(d => {
      // do something with the updated item
    });

    // delete the todo
    repo.delete(toDo); // fire and forget

    // get a single doc by identifier
    const subscription = repo.get('1').subscribe({
      next: d => {
        // do something with the returned document
      }
    });

    // get all documents in the collection
    const subscription = repo.list().subscribe({
      next: d => {
        // do something with the array of documents
      }
    });

  }
}
```

### Entities

Within the repo we map the document identifier (whether generated automatically or explicitly) to a field named _id_. To be sure TypeScript doesn't complain about this we have a generic constraint on the _T_ you pass to the factory when creating a repo. The constraint requires that your entities implemnt the IAngularFireRepoEntity interface that defines an optional _id_ property. It is optional so you can leave it off when creating new entities, but will be populated when during creation or retrieving. So your types need to look something like this:

```ts
export interface IToDo extends IAngularFireRepoEntity {
    title: string;
    desription?: string;
    done?: boolean;
}
```

Simple as that. Constructive critcism and suggestions are encouraged, please post an issue with your suggestion or comment and it will be dealt with as soon as time allows.

Contributions will be considered via pull request too.

I created this quickly to help someone out who is just getting started with Angular and Firebase, so expect a few changes as they use it and it gets improved.
