/**
 * @module AboutUs
 */
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Stagger, Fade } from 'react-animation-components';
import PropTypes from 'prop-types';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

/**
 * Component for rendering list of leaders on about page.
 * @param {object} leader Containing information about the leader.
 */
const RenderLeader = ({ leader }) => {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + leader.image} alt={leader.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    );
};

RenderLeader.propTypes = {
    leader: PropTypes.object,
};

/**
 * Component for showing about page.
 * @param {object} leaders Containing array of leaders and information about errors and loading.
 */
const About = ({ leaders }) => {
    let leadersBlock;

    if (leaders.isLoading) {
        leadersBlock = <Loading />;
    } else if (leaders.errMessage) {
        leadersBlock = <h4>{leaders.errMessage}</h4>;
    } else {
        leadersBlock = (
            <Media list>
                <Stagger in>
                    {leaders.leaders.map((leader) => {
                        return (
                            <Fade in key={leader.id}>
                                <RenderLeader leader={leader} />
                            </Fade>
                        );
                    })}
                </Stagger>
            </Media>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3 className="page-title">About Us</h3>
                </div>
            </div>
            <div className="row row-content d-flex justify-content-between">
                <div className="col-12 col-md-6">
                    <h2 className="page-subtitle">Our History</h2>
                    <p>
                        Started in 2010, Ristorante con Fusion quickly
                        established itself as a culinary icon par excellence in
                        Hong Kong. With its unique brand of world fusion cuisine
                        that can be found nowhere else, it enjoys patronage from
                        the A-list clientele in Hong Kong. Featuring four of the
                        best three-star Michelin chefs in the world, you never
                        know what will arrive on your plate the next time you
                        visit us.
                    </p>
                    <p>
                        The restaurant traces its humble beginnings to{' '}
                        <em>The Frying Pan</em>, a successful chain started by
                        our CEO, Mr. Peter Pan, that featured for the first time
                        the world's best cuisines in a pan.
                    </p>
                </div>
                <div className="col-12 col-md-5 d-flex align-items-center">
                    <Card>
                        <CardHeader className="bg-primary text-white facts">
                            Facts At a Glance
                        </CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content d-flex justify-content-between">
                <div className="col-12">
                    <h2 className="page-subtitle">Corporate Leadership</h2>
                </div>
                <div className="col-12">{leadersBlock}</div>
            </div>
        </div>
    );
};

About.propTypes = {
    leaders: PropTypes.object,
};

export default About;
