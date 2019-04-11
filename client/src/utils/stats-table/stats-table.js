import _ from 'lodash';
import React, { Component } from 'react';

import {
    Table,
    Row,
    Col
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';

class StatTable extends Component {
    componentWillMount() {}

    constructor(props) {
        super(props);

        this.state = {
            notEmpty: true
        }
    }

    loadHeaders() {
        let headers = [];

        _.forEach(this.headers, (value) => {
            headers.push(<th key={value.dataField}>{value.text}</th>)
        })
        return headers;
    }

    loadTable() {
        if (this.props.data) {
            return(
                <BootstrapTable keyField={this.props.keyField} 
                    data={this.props.data}
                    columns={this.props.headers}
                    responsive
                    striped
                    bordered={false}/>
            )
        } else {
            return(
                <div>
                    <Table responsive striped={this.notEmpty}>
                        <thead>
                            <tr>
                                {this.loadHeaders()}
                            </tr>
                        </thead>
                    </Table>
                    {this.loadNoData()}
                </div>
            )
        }
    }

    loadNoData() {
        return (
            <Row>
                <Col xs="12" className="text-center">
                    <i>No Stats Available</i>
                </Col>
            </Row>
        );
    }

    render() {
        return(
            <div>
                <h4>{this.props.title}</h4>
                {this.loadTable()}
            </div>
        )
    }
}

export default StatTable;