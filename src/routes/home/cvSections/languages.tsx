import { h } from 'preact';
import languagesJson from '../../../data/languages.json';


export default function TechnologiesSummary(props: { class?: string }) {

    return (
        <div class={props.class}>
            {Object.entries(languagesJson).map(([key, value]) => <Section key={`Section${key}`} type={key as string} content={value as LanguageType} />)}
        </div>
    );
}

function Section(props: {
    type: string;
    content: LanguageType;
}) {

    const backgrounds = ["", "bg-success", "bg-info", "bg-warning", "bg-danger"];

    return (<div class={"card text-white bg-dark mb-3"}>

        <div className="card-header">
            <h4>{props.type}</h4>
        </div>

        <div className="card-body">
            <ul class="nav nav-tabs nav-fill" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" data-bs-toggle="tab" href={`#languages${props.type}`} aria-selected="true" role="tab">Languages</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-bs-toggle="tab" href={`#frameworks${props.type}`} aria-selected="false" tabIndex={-1} role="tab">Frameworks</a>
                </li>
            </ul>
            <div id={`myTabContent${props.type}`} class="tab-content border-light">
                <div id={`languages${props.type}`} class="tab-pane fade show active bg-dark p-3" role="tabpanel">
                    <ul>
                        {Object.entries(props.content.Languages).map(([key, value], index) => <ProgresBar key={`ProgressBar${key}`} name={key} value={value} barColor={backgrounds[index % backgrounds.length]} />)}
                    </ul>
                </div>
                <div class="tab-pane fade p-3" id={`frameworks${props.type}`} role="tabpanel">
                    <ul>
                        {Object.entries(props.content.Frameworks).map(([key, value], index) => <ProgresBar key={`ProgressBar${key}`} name={key} value={value} barColor={backgrounds[index % backgrounds.length]} />)}
                    </ul>
                </div>
            </div>
        </div>
    </div>);
}

function ProgresBar(props: {
    name: string;
    value: number;
    barColor: string;
}) {

    const progress = props.value * 10;

    return (

        <div class={"row my-2"}>
            <div className="col-2"><p>{props.name}</p></div>

            <div className="col-10">
                <div class="progress" style={"height: 20px;"}>
                    <div class={`progress-bar progress-bar-striped progress-bar-animated ${props.barColor}`} role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={`width: ${progress}%;`}>
                        {props.value} / 10
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Root {
    Web: LanguageType
    Programmation: LanguageType
}

interface LanguageType {
    Languages: Languages
    Frameworks: Frameworks
}

interface Languages {
    [key: string]: number;
}

interface Frameworks {
    [key: string]: number;
}