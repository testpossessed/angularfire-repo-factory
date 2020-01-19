import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireRepoFactory } from '../../../../angularfire-repo-factory/src/public-api';
import { IToDo } from '../models/IToDo';
import { AngularFirestoreRepo } from '../../../../angularfire-repo-factory/src/lib/angularfire-repo';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(private angularFireRepoFactory: AngularFireRepoFactory) {
        this.repo = this.angularFireRepoFactory.create<IToDo>('todo');
        this.todo$ = this.repo.list();
    }
    public todo$: Observable<IToDo[]>;
    public displayedColumns: string[] = ['title', 'description', 'created', 'done', 'completed'];
    public title: string;
    public description: string;

    private repo: AngularFirestoreRepo<IToDo>;

    toggleDone = (item: IToDo) => {
        item.done = !item.done;
        if (item.done) {
            item.completed = new Date();
        } else {
            item.completed = null;
        }

        this.repo.update(item);
    };

    createTask = () => {
        const item: IToDo = {
            title: this.title,
            description: this.description,
            created: new Date(),
            done: false
        };

        this.repo.add(item);
        this.title = '';
        this.description = '';
    };

    ngOnInit() {}
}
