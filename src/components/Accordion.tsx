import React from "react";
import { Card, Accordion } from "react-bootstrap";

export default class AccordionComponent extends React.Component<any, any>{
    render() {
        return (
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body><div className="app__content">
                            <p className="app__text">
                                ReactJS collapsible component using CSS transition.<br />
                                <br />Can be reversed before it completes. Try to double click the
                                toggle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                 ut aliquip ex ea commodo consequat.{" "}
                            </p>
                            <img
                                className="app__image"
                                alt="random"
                                src="https://source.unsplash.com/user/erondu/600x200"
                            />
                        </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <div className="app__content">
                                <p className="app__text">
                                    ReactJS collapsible component using CSS transition.<br />
                                    <br />Can be reversed before it completes. Try to double click the
                                    toggle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                 ut aliquip ex ea commodo consequat.{" "}
                                </p>
                                <img
                                    className="app__image"
                                    alt="random"
                                    src="https://source.unsplash.com/user/erondu/600x200"
                                />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <div className="app__content">
                                <p className="app__text">
                                    ReactJS collapsible component using CSS transition.<br />
                                    <br />Can be reversed before it completes. Try to double click the
                                    toggle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                 ut aliquip ex ea commodo consequat.{" "}
                                </p>
                                <img
                                    className="app__image"
                                    alt="random"
                                    src="https://source.unsplash.com/user/erondu/600x200"
                                />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion >

        )
    }
}