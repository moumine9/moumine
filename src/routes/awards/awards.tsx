import { Table } from 'react-bootstrap';
import awardsJson from '../../data/awards.json';

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

    return (
    <div class="cover"><Table hover striped bordered>
        <thead>
            <tr>
                {Object.keys(awards[0]).map(e => <th key={`awardHeader${e}`} scope={"col"}>{e}</th>)}
            </tr>
        </thead>
        <tbody>
            {awards.map((row, index) => <tr key={`tableRow${index}`}>{Object.values(row).map((r, indexCell) => <td key={`tableCell${index}${indexCell}`}>{r}</td>)}</tr>)}
        </tbody>
    </Table>
    </div>);
}