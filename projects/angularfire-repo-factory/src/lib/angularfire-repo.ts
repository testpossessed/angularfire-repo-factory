import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAngularFireRepoEntity } from './angularfire-repo-entity';

export class AngularFirestoreRepo<T extends IAngularFireRepoEntity> {
    private collection: AngularFirestoreCollection<T>;

    constructor(private angularFiretore: AngularFirestore, collectionPath: string) {
        this.collection = this.angularFiretore.collection<T>(collectionPath);
    }

    add(item: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            this.collection.add(item).then(ref => {
                const newItem = {
                    id: ref.id,
                    ...(item as any)
                };
                resolve(newItem);
            });
        });
        return promise;
    }

    delete(id: string): void {
        const docRef = this.collection.doc<T>(id);
        docRef.delete();
    }

    get(identifier: string): Observable<T> {
        return this.collection
            .doc<T>(identifier)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    if (doc.payload.exists) {
                        const data = doc.payload.data() as any;
                        const id = (doc.payload as any).id;
                        return { id, ...data };
                    }
                })
            );
    }

    list(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as T;
                    data.id = (a.payload.doc as any).id;
                    return data;
                });
            })
        );
    }

    update(item: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            this.collection
                .doc<T>(item.id)
                .set(item)
                .then(() => {
                    resolve({
                        ...(item as any)
                    });
                });
        });
        return promise;
    }
}
