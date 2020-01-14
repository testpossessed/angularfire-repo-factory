import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreRepo } from './angularfire-repo';
import { AngularFireRepoEntity } from './angularfire-repo-entity';

@Injectable({
    providedIn: 'root'
})
export class AngularFireRepoFactory {
    constructor(private angularFirestore: AngularFirestore) {}

    public create<T extends AngularFireRepoEntity>(collectionPath: string): AngularFirestoreRepo<T> {
        return new AngularFirestoreRepo<T>(this.angularFirestore, collectionPath);
    }
}
