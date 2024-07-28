import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="bg-dark text-light py-5">
            <Container>
                <h1 className="display-4">ברוכים הבית לאתר שלנו</h1>
                <p className="lead">
                    רשת המלונות הכשרים בעולם עבור הציבור הדתי הרוצה לנפוש ולנוח מסביב לעולם.
                </p>
            </Container>
            <Container className="py-5">
                <Row>
                    <Col>
                        <Card bg="dark" text="light" className="p-4">
                            <Card.Body>
                                <Card.Title>אודות האתר</Card.Title>
                                <Card.Text>
                                    תוכן נוסף כאן על האתר ועל רשת המלונות הכשרים בעולם.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
