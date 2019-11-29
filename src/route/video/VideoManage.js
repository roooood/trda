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
import Context from 'library/Context';


class Screen extends React.Component {
    static contextType = Context;
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
                        title={t('Videos')}
                        columns={[
                            { title: t('title'), field: 'title' },
                            { title: t('image'), field: 'image', render: row => <img src={row.image} style={styles.img} /> },
                            { title: t('video'), field: 'link' },
                            { title: t('view'), field: 'view', editable: 'never' },
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                Fetch('manage/list', {
                                    type: 'video',
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
                                        type: 'video',
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
                                            type: 'video',
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
                                        type: 'video',
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
    img: {
        height: 60,
        borderRadius: 5
    }
}
export default Screen;