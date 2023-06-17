import React from "react";
import { Card } from "react-bootstrap";
import HeadCustom from "@/components/Layouts/Shared/HeadCustom";
import MainLayout from "@/components/Layouts/MainLayout";
import MainBodyWrap from "@/components/Layouts/Shared/MainBodyWrap";

export default function CardWrap({ children,  childrenTitle, subHeader, styleCardBody }) {
  return (
        <>
            <MainBodyWrap>
                <Card className={"border-0 shadow-sm"}>
                <Card.Header className={"align-items-center"}>
                    <div className={"row"}>
                    <div className={"col"}>
                        <div className={"font-weight-medium py-1"}>{childrenTitle}</div>
                    </div>
                    <div className={"col-auto"}>{subHeader}</div>
                    </div>
                </Card.Header>
                <Card.Body style={styleCardBody}>{children}</Card.Body>
                </Card>
            </MainBodyWrap>
        </>
    );
}
