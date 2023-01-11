import { h } from 'preact';
import formationsJson from '../../../data/formations.json';


export default function Formations(props: {
    class?: string;
}) {

    const formations: Formations = formationsJson;

    const Icon = ( (props: { iconName: string }) => <i class={`fa-duotone ${ props.iconName.includes("fa") ? props.iconName : `fa-${props.iconName}`} me-1`} />);

    return (<div className={props.class}>
        {formations.map((formation, indexF) => <div key={`formation#${indexF}`} class={"card mb-3"}>
            <div class={"card-body"}>
                <h4 class={"card-title m-1"} > <Icon iconName={"fa-building-columns"} /> <a href={formation.link} target="_blank" rel="noreferrer"><b>{formation.place}</b></a></h4>
                <h5 class={"card-subtitle m-1"} > <Icon iconName={"fa-graduation-cap"} /> {formation.type}</h5>
                <h6 class={"card-subtitle text-muted m-1"}> <Icon iconName={"clock"} /> {formation.time.start} &mdash; {formation.time.end}</h6>
                <ul class={"card-text list-bullets my-3"}>
                    {formation.courses.map((t, index) => <li key={`formation${indexF}courses${index}`}>{t}</li>)}
                </ul>
            </div>
        </div>)}</div>);
}


type Formations = Formation[];
export type Formation = Root;

export interface Root {
    place: string
    type: string
    link: string
    time: Time
    courses: string[]
}

export interface Time {
    start: string
    end: string
}
