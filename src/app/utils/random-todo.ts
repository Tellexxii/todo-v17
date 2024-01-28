import {Priority, Todo} from "../modules/todo/models/todo";
import {uuidv4} from "./uuid";

export function getRandomTodo(): Todo {
    return {
        id: uuidv4(),
        createdAt: Date.now().toString(),
        isDone: false,
        title: `${activities[Math.floor(Math.random() * activities.length)]} ${associatedObjects[Math.floor(Math.random() * associatedObjects.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, leo ut placerat finibus, orci mi scelerisque neque, ut consequat sapien neque eget dui',
        priority: Object.values(Priority)[Math.floor(Math.random() * Object.keys(Priority).length)] as Priority
    }
}

const activities = ['wash', 'draw', 'kick', 'run', 'jump', 'swim', 'read', 'sing', 'dance', 'cook'];

const associatedObjects = ['car', 'paper', 'ball', 'track', 'trampoline', 'pool', 'book', 'microphone', 'stage', 'kitchen'];

const places = ['in a car wash', 'in an art studio', 'on a soccer field', 'on a running track', 'on a trampoline', 'in a swimming pool', 'in a library', 'in a recording studio', 'on a dance floor', 'in a kitchen'];
