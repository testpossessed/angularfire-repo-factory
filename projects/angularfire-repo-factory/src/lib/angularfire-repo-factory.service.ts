import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreRepo } from './angularfire-repo';
import { IAngularFireRepoEntity } from './angularfire-repo-entity';

@Injectable({
    providedIn: 'root'
})
export class AngularFireRepoFactory {
    constructor(private angularFirestore: AngularFirestore) {}

    public create<T extends IAngularFireRepoEntity>(collectionPath: string): AngularFirestoreRepo<T> {
        return new AngularFirestoreRepo<T>(this.angularFirestore, collectionPath);
    }
}
