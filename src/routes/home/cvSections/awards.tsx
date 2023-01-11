import { h } from 'preact';
import awardsJson from '../../../data/awards.json';

interface Award {
    contest: string;
    category: string;
    time: string;
    place: string;
}

export default function Awards(props: {
    class?: string;
}) {

    const awards: Award[] = awardsJson;

    return (<table class={"table table-hover table-striped table-bordered"}>
        <thead>
            <tr>
                {Object.keys(awards[0]).map(e => <th key={`awardHeader${e}`} scope={"col"}>{e.toUpperCase()}</th>)}
            </tr>
        </thead>
        <tbody>
            {awards.map((row, index) => <tr key={`tableRow${index}`}>{Object.values(row).map((r, indexCell) => <td key={`tableCell${index}${indexCell}`}>{r}</td>)}</tr>)}
        </tbody>
    </table>);
}