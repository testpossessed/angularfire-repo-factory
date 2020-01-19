import { IAngularFireRepoEntity } from '../../../../angularfire-repo-factory/src/public-api';

export interface IToDo extends IAngularFireRepoEntity {
    completed?: Date;
    created: Date;
    description: string;
    done: boolean;
    title: string;
}
