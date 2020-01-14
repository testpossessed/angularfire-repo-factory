## Angularfire Repository Factory

This Angular library includes a module that provides a factory service for creating generic repositories for accessing data Firebase using AngularFire.

Often when using AngularFire you create a lot of code that is very similar. Even if you take the trouble to create a generic repository base class and derive from it to create strongly typed data access services you write a lot of code that is almost the same. Not fun and time consuming so to save time and reduce repetetive coding here is a factory that you inject and have it create a generic repository typed for the documents you want to access.
