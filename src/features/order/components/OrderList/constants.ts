interface IProps {
    panel: string;
    panelId: string;
    panelAria: string;
    title: string;
    details: string;
    routes: IRoute[];
}

interface IRoute {
    name: string;
    id: number;
}

export const orderList: IProps[] = [
    {
        panel: 'panel1',
        panelId: 'panel1d-header',
        panelAria: 'panel1d-content',
        title: 'Order List',
        routes: [
            {
                name: '12-A',
                id: 1,
            },
            {
                name: '13-A',
                id: 2,
            },
            {
                name: '14-A',
                id: 3,
            },
            {
                name: '15-A',
                id: 4,
            },
            {
                name: '16-A',
                id: 5,
            },
            {
                name: '17-A',
                id: 6,
            },
            {
                name: '18-A',
                id: 7,
            },
            {
                name: '19-A',
                id: 9,
            },
            {
                name: '20-A',
                id: 10,
            },
        ],
        details:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        panel: 'panel2',
        panelId: 'panel2d-header',
        panelAria: 'panel2d-content',
        title: 'Order List 2',
        routes: [
            {
                name: '12-B',
                id: 1,
            },
            {
                name: '13-B',
                id: 2,
            },
            {
                name: '14-B',
                id: 3,
            },
            {
                name: '15-B',
                id: 4,
            },
            {
                name: '16-B',
                id: 5,
            },
            {
                name: '17-B',
                id: 6,
            },
            {
                name: '18-B',
                id: 7,
            },
            {
                name: '19-B',
                id: 9,
            },
            {
                name: '20-B',
                id: 10,
            },
        ],
        details:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        panel: 'panel3',
        panelId: 'panel3d-header',
        panelAria: 'panel3d-content',
        title: 'Order List 3',
        routes: [
            {
                name: '12-C',
                id: 1,
            },
            {
                name: '13-C',
                id: 2,
            },
            {
                name: '14-C',
                id: 3,
            },
            {
                name: '15-C',
                id: 4,
            },
            {
                name: '16-C',
                id: 5,
            },
            {
                name: '17-C',
                id: 6,
            },
            {
                name: '18-C',
                id: 7,
            },
            {
                name: '19-C',
                id: 9,
            },
            {
                name: '20-C',
                id: 10,
            },
        ],
        details:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
        panel: 'panel4',
        panelId: 'panel4d-header',
        panelAria: 'panel4d-content',
        title: 'Order List 4',
        routes: [
            {
                name: '12-D',
                id: 1,
            },
            {
                name: '13-D',
                id: 2,
            },
            {
                name: '14-D',
                id: 3,
            },
            {
                name: '15-D',
                id: 4,
            },
            {
                name: '16-D',
                id: 5,
            },
            {
                name: '17-D',
                id: 6,
            },
            {
                name: '18-D',
                id: 7,
            },
            {
                name: '19-D',
                id: 9,
            },
            {
                name: '20-D',
                id: 10,
            },
        ],
        details:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
];
