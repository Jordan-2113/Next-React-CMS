import * as React from "react";
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import Chart from "react-chartjs-2";

export type ChartHolderProps = {
    ratio?: number,
    redraw?: boolean;
    type: ChartType;
    data: ChartData;
    options?: ChartOptions;
    fallbackContent?: React.ReactNode;
    getDatasetAtEvent?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
    getElementAtEvent?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
    getElementsAtEvent?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const ChartHolder = (props: ChartHolderProps): JSX.Element => {
    return (
        <div className="chart-holder">
            <div className="chart-holder--wrapper" style={{ paddingTop: `${(props.ratio || 1)*100}%` }}>
                <div className="chart-holder--chart">
                    <Chart
                        type={props.type}
                        data={props.data}
                        redraw={props.redraw}
                        options={props.options || {}}
                        fallbackContent={props.fallbackContent}
                        getDatasetAtEvent={props.getDatasetAtEvent}
                        getElementAtEvent={props.getElementAtEvent}
                        getElementsAtEvent={props.getElementsAtEvent}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChartHolder;