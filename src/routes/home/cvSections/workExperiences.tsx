import { Fragment } from "preact";
import { useMemo, useState } from 'preact/hooks';
import { ListGroup, ListGroupItem, Modal } from "react-bootstrap";

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import workExperiencesJson from "../../../data/workexperiences.json";
import "../style.css";


export default function WorkExperiences(props: {
    class?: string;
}) {

    const [selectedExperience, setSelectedExperience] = useState<WorkExperience>();

    const [showModal, setShowModal] = useState(false);

    const rows: WorkExperience[] = useMemo(() => workExperiencesJson, []);

    return (<Fragment>
        <div class={`${props.class} d-flex flex-wrap justify-content-between`}>
            {rows.map((exp, index) => <ExperienceCard
                key={`ExperienceCard${index}`}
                experience={exp} onClick={() => {
                    setSelectedExperience(exp);
                    setShowModal(true);
                }}
            />
            )}
        </div>
        {selectedExperience && <ModalExperience show={showModal} exp={selectedExperience} onClose={() => {
            setShowModal(false);
            setSelectedExperience(undefined);
        }} />}
    </Fragment>);
}

function ExperienceCard(props: {
    class?: string;
    experience: WorkExperience;
    onClick: () => void;
}) {

    const exp = props.experience;

    return (
        <div class="col-6 p-1" style={{ height: "250px",  }} onClick={props.onClick}>
            <div class={'card onHoverZoom'}>
                <div class="card-body">
                    <h5 class="card-title">{exp.role.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{exp.company.name} &mdash; {exp.company.place}</h6>
                    <p class="card-text">{exp.years.start} &mdash; {exp.years.end}</p>
                    <p class="card-text">
                        {exp.role.description?.substring(0, 100)} ...
                    </p>
                </div>
                <div class={"card-footer"}>
                    <WorkTypeBadge key={`WorkTypeBadge${exp.company.name}`} expName={exp.company.name} type={exp.type} />
                </div>
            </div>
        </div>
    );
}

function ModalExperience(props: {
    show: boolean;
    exp: WorkExperience;
    onClose: () => void;
}) {
    const { exp, onClose, show } = props;

    dayjs.extend(relativeTime);
    dayjs.extend(duration);

    const Icon = ( (props: { iconName: string }) => <i class={`fa-duotone ${props.iconName} me-1`} />);

    const [roleStartDate, roleEndDate] = [dayjs(exp.years.start), exp.years.end === "now" ? dayjs() : dayjs(exp.years.end)];

    const roleDuration = dayjs.duration(roleStartDate.diff(roleEndDate)).humanize();

    return <Modal
        id={"modalExperience"}
        show={show}
        onHide={() => onClose()}
        dialogClassName="modal-lg modal-dialog-scrollable"
        aria-labelledby="example-custom-modal-styling-title"
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                {exp.role.name} @ {exp.company.name}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <p className={"my-2 text-break"}>{exp.role.description}</p>

            <ListGroup>

                <ListGroupItem>
                    <ul>{exp.role.tasks.map((t, index) => <li key={`roleTasks${exp.role.name}${index}`}>{t}</li>)}</ul>
                </ListGroupItem>

                <ListGroup className={"d-flex"} horizontal>

                    <ListGroupItem class={"flex-fill"}>
                        <h5 class={"mb-3"}> <Icon iconName={"fa-brackets-curly"} /> Languages</h5>
                        <ul>{exp.languages?.map(e => <li key={`expLanguages${e}`}>{e}</li>)}</ul>
                    </ListGroupItem>

                    <ListGroupItem className={"flex-fill"}>
                        <h5 className={"mb-3"}> <Icon iconName={"fa-brain-circuit"} /> Technologies</h5>
                        <ul class={"list-unstyled"}>{exp.technologies?.map(e => <li key={`expLanguages${e}`}> <Icon iconName="fa-check" /> {e}</li>)}</ul>
                    </ListGroupItem>

                    <ListGroupItem className={"flex-fill"}>
                        <h5 class={"mb-3"}> <Icon iconName="fa-cubes" />Librairies</h5>
                        <ul>{exp?.librairies?.map(e => <li key={`expLibrairies${e}`}>{e}</li>)}</ul>
                    </ListGroupItem>

                </ListGroup>

                <ListGroupItem>
                    <p> <i class="fa-duotone fa-clock me-1" /> <span>{exp.years.start}</span> &mdash; <span>{exp.years.end}</span> &nbsp;&nbsp; <i class={"text-muted"}>({roleDuration})</i> </p>
                </ListGroupItem>

                <ListGroupItem>
                    <p> <i class="fa-duotone fa-user-helmet-safety me-1" /> { exp.company.team } (<i>{exp.company.sector}</i>) </p>
                </ListGroupItem>

                <ListGroupItem>
                    <p> <i class="fa-duotone fa-location-dot me-1" /> { exp.company.place } </p>
                </ListGroupItem>

                <ListGroupItem>
                    <p> <i class="fa-duotone fa-tags me-1" /> <WorkTypeBadge expName={exp.company.name} type={exp.type} />  </p>
                </ListGroupItem>

            </ListGroup>

        </Modal.Body>
    </Modal>;

}

function WorkTypeBadge(props: {
    expName: string;
    type: string;
}) {

    const expTypeStyles: Record<string, string> = {
        frontend: "bg-danger",
        backend: "bg-info",
        others: "bg-light",
        contract: "bg-warning",
        longterm: "bg-Success",
        intern: "bg-primary"
    };

    return <span className={"my-1"}>{props.type.split(";").map(k => <span key={`expType${props.expName}${k}`} class={`badge ${expTypeStyles[k]} mx-1`}>{k}</span>)}</span>
}


export interface WorkExperience {
    company: Company
    type: string
    role: Role
    years: Years
    languages?: string[]
    frameworks?: Frameworks
    technologies?: string[]
    environment?: Environment
    librairies?: string[]
}

export interface Company {
    name: string
    sector: string
    team?: string
    place: string
}

export interface Role {
    name: string
    description: string
    tasks: string[]
}

export interface Years {
    start: string
    end: string
}

export interface Frameworks {
    react: React
}

export interface React {
    version: string[]
}

export interface Environment {
    editor: string[]
}
