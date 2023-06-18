import React from "react";
import { Card } from "react-bootstrap";

export default function CardWrap({ children, title, subHeader, styleCardBody }) {
    return (
        <Card className={"border-0 shadow-sm"}>
            <Card.Header className={"align-items-center"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <div className={"font-weight-medium py-1"}>{title}</div>
                    </div>
                    <div className={"col-auto"}>{subHeader}</div>
                </div>
            </Card.Header>
            <Card.Body style={styleCardBody}>{children}</Card.Body>
        </Card>
    );
}
