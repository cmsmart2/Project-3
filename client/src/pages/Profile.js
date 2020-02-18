import React from "react";
import Calender from "../components/calendar";
import { Container, Row, Col } from "../components/Grid";
// import Navbar from "../components/Navbar";
import Countdown from "../components/countdown"


function Profile () {
    return(
        <>
        {/* <Navbar/> */}
        <Container>
            <Row>
                <Col size="md-6">
                    <p>User information 1</p>
                </Col>
                <Col size="md-6">
                    <p>User information 2</p>

                </Col>
            </Row>
            <Calender/>
            <Countdown/>
        </Container>
        </>
    );
}
export default Profile;