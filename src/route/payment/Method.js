import React from 'react';
import autoBind from 'react-autobind';
import { t } from 'locales';
import Fetch from 'library/Fetch';
import { timing, toMoney, diff } from 'library/Helper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table'
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import Switch from '@material-ui/core/Switch';


class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        autoBind(this);
    }
    render() {
        return (
            <Grid item xs={12}>
                <Paper style={styles.root}>
                    <MaterialTable
                        title={t('Payment')}
                        columns={[
                            { title: t('title'), field: 'title' },
                            { title: t('logo'), field: 'logo' },
                            { title: t('link'), field: 'link' },

                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                Fetch('manage/list', {
                                    type: 'payment',
                                    page: (query.page + 1),
                                    perPage: query.pageSize
                                }, (result) => {
                                    resolve({
                                        data: result.data,
                                        page: result.page - 1,
                                        totalCount: result.total,
                                    })
                                })
                            })
                        }
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    Fetch('manage/add', {
                                        type: 'payment',
                                        data: JSON.stringify(newData)
                                    }, (result) => {
                                        resolve();
                                    })
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    let data = diff(newData, oldData);
                                    if (Object.keys(data).length > 0) {
                                        Fetch('manage/update', {
                                            type: 'payment',
                                            id: oldData.id,
                                            data: JSON.stringify(data)
                                        }, (result) => {
                                            resolve();
                                        })
                                    }
                                    else {
                                        resolve();
                                    }
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    Fetch('manage/delete', {
                                        type: 'payment',
                                        id: oldData.id,
                                    }, (result) => {
                                        resolve();
                                    })
                                }),
                        }}
                    />
                </Paper>
            </Grid>
        );
    }
}

const styles = {
    root: {
        width: '100%',
    },
}
export default Screen;