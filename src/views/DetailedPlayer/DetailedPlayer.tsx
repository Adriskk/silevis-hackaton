import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  APIS,
  ENDPOINTS,
  HEATMAP_CHART_OPTIONS,
  PIE_CHART_LABELS,
} from "../../config";
import { Card } from "primereact/card";
import Chart from "react-apexcharts";
import Player from "../../interfaces/Player";
import { Skeleton } from "primereact/skeleton";
import { splitNumber } from "../../utils/split-number";
import { Button } from "primereact/button";
import { useAuth } from "../../hooks/useAuth";
import { Chart as PrimeChart, ChartProps } from "primereact/chart";

const DetailedPlayer: FC = () => {
  const { id } = useParams<{ id: string }>();
  const auth = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [loaders, setLoaders] = useState({
    chartData: true,
    playerData: true,
  });
  const [chartData, setChartData] = useState<[[any], [any, any, any]]>([
    [[]],
    [{}, {}, {}],
  ]);
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [pieChart, setPieChart] = useState<ChartProps["data"]>({
    labels: PIE_CHART_LABELS,
    datasets: [
      {
        backgroundColor: ["#d1d5ed", "#6372c3", "#2c397f"],
        hoverBackgroudColor: ["#d1d5ed", "#6372c3", "#2c397f"],
        data: [],
      },
    ],
  });

  const [barChart1, setBarChart1] = useState({
    labels: Array.from({ length: 17 }, (v, i) => i + 1),
    datasets: [
      {
        label: "Shots",
        backgroundColor: "#6372c3",
        data: [],
      },
      {
        label: "Shot's on target",
        backgroundColor: "#2c397f",
        data: [],
      },
    ],
  });

  const [barChart2, setBarChart2] = useState({
    labels: Array.from({ length: 17 }, (v, i) => i + 1),
    datasets: [
      {
        label: "Passes",
        backgroundColor: "#6372c3",
        data: [],
      },
      {
        label: "Passes on target",
        backgroundColor: "#2c397f",
        data: [],
      },
    ],
  });

  const [lineChart, setLineChart] = useState({
    labels: Array.from({ length: 17 }, (v, i) => i + 1),
    datasets: [
      {
        label: "Goals",
        data: [],
        fill: true,
        borderColor: "#6372c3",
        tension: 0.4,
      },
      {
        label: "Assists",
        data: [],
        fill: true,
        borderColor: "#d1d5ed",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (!id) return;

    try {
      fetchPLayerBioData()
        .then((d: Player) => {
          setPlayerData(d);
        })
        .catch(({ res }) => {
          setError(true);
        });
    } catch (e) {
      setError(true);
    }

    try {
      fetchDetailedPlayerData()
        .then((d: [[any], [any, any, any]]) => {
          setChartData(d);

          setBarChart1({
            ...barChart1,
            datasets: [
              {
                ...barChart1.datasets[0],
                data: d[1][0].shots,
              },
              {
                ...barChart1.datasets[1],
                data: d[1][0].shots_on_target,
              },
            ],
          });

          setBarChart2({
            ...barChart2,
            datasets: [
              {
                ...barChart2.datasets[0],
                data: d[1][0].passes,
              },
              {
                ...barChart2.datasets[1],
                data: d[1][0].passes_on_target,
              },
            ],
          });

          setLineChart({
            ...lineChart,
            datasets: [
              {
                ...lineChart.datasets[0],
                data: d[1][0].goals,
              },
              {
                ...lineChart.datasets[1],
                data: d[1][0].assists,
              },
            ],
          });

          setPieChart({
            ...pieChart,
            datasets: [
              {
                backgroundColor: ["#d1d5ed", "#6372c3", "#2c397f"],
                hoverBackgroudColor: ["#d1d5ed", "#6372c3", "#2c397f"],
                data: [...Object.values(d[1][2])],
              },
            ],
          });
        })
        .catch(({ res }) => {
          setError(true);
        });
    } catch (e) {
      setError(true);
    }

    setLoaders({ chartData: false, playerData: false });
  }, []);

  const fetchDetailedPlayerData = async (): Promise<
    [[any], [any, any, any]]
  > => {
    const { data } = await axios.get<[[any], [any, any, any]]>(
      APIS.API_V2 +
        ENDPOINTS.GET.GET_PLAYER_DETAILED_STATS.replace(
          ":id",
          id || "-1"
        ).replace(":season", "2021-2022")
    );
    return data;
  };

  const fetchPLayerBioData = async (): Promise<Player> => {
    const { data } = await axios.get<Player>(
      APIS.API_V2 +
        ENDPOINTS.GET.GET_PLAYER_BIO.replace(":id", id || "-1").replace(
          ":season",
          "2021-2022"
        )
    );
    return data;
  };

  const generateChartData = (datasets: any[]) => {
    return datasets.map((dataset) => ({
      series: dataset.map(
        (set: { [s: string]: unknown } | ArrayLike<unknown>) => ({
          name: Object.keys(set)[0],
          data: Object.values(set)[0],
        })
      ),
    }));
  };

  const charts = generateChartData(chartData[0]);

  const CARD_FOOTER = (
    <div className="flex gap-2 justify-content-end">
      {auth?.token && (
        <Button label="Add to favourites" icon="pi pi-star-fill" />
      )}
      <Button label="Compare to other" icon="pi pi-user" />
    </div>
  );

  return (
    <section className="flex flex-column align-self-center justify-content-start gap-4">
      <Card
        title={`${playerData?.first_name} ${playerData?.last_name}`}
        subTitle="Detailed player data and statistics."
        footer={CARD_FOOTER}
      >
        {!loaders.playerData ? (
          <>
            <div className="grid gap-1">
              <div className="col-3">
                Birthday: <span className="row-value">{playerData?.b_day}</span>
              </div>

              <div className="col-3">
                Weight:{" "}
                <span className="row-value">{playerData?.weight} KG</span>
              </div>

              <div className="col-3">
                Height: <span className="row-value">{playerData?.height}</span>
              </div>

              <div className="col-3">
                Preferred foot:{" "}
                <span className="row-value">{playerData?.pref_foot}</span>
              </div>

              <div className="col-3">
                Main position:{" "}
                <span className="row-value">{playerData?.main_position}</span>
              </div>

              <div className="col-3">
                Current club:{" "}
                <span className="row-value">{playerData?.current_club}</span>
              </div>

              <div className="col-3">
                Nationality:{" "}
                <span className="row-value">{playerData?.nationality}</span>
              </div>

              <div className="col-3">
                Player price:{" "}
                <span className="row-value">
                  {splitNumber(playerData?.price || 0)} EUR
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-column gap-2">
            <div className="flex gap-2">
              <Skeleton shape="rectangle" width="50%" />
              <Skeleton shape="rectangle" width="50%" />
            </div>

            <div className="flex gap-2">
              <Skeleton shape="rectangle" width="50%" />
              <Skeleton shape="rectangle" width="50%" />
            </div>

            <div className="flex gap-2">
              <Skeleton shape="rectangle" width="50%" />
              <Skeleton shape="rectangle" width="50%" />
            </div>
          </div>
        )}
      </Card>

      <div className="flex align-items-center justify-content-between gap-4 w-full">
        <Card
          title="Accuracy of shots"
          subTitle="The chart displays the accuracy of the player's shots."
          className="col-2 flex p-4"
          style={{ width: "calc(50% - (1.25rem / 2))" }}
        >
          <PrimeChart
            type="bar"
            data={barChart1}
            id={"bar-1-" + playerData?.id.toString()}
            options={{
              animation: { duration: 0 },
              maintainAspectRatio: false,
              aspectRatio: 0.8,
              plugins: {
                legend: {
                  labels: {
                    color: "#495057",
                  },
                },
              },
            }}
          />
        </Card>
        <Card
          title="Pass accuracy"
          subTitle="The chart displays the accuracy of the player's passes."
          className="col-2 flex p-4"
          style={{ width: "calc(50% - 1.5rem / 2)" }}
        >
          <PrimeChart
            type="bar"
            data={barChart2}
            id={"bar-2-" + playerData?.id.toString()}
            options={{
              animation: { duration: 0 },
              maintainAspectRatio: false,
              aspectRatio: 0.8,
              plugins: {
                legend: {
                  labels: {
                    color: "#495057",
                  },
                },
              },
            }}
          />
        </Card>
      </div>

      <Card
        className="flex p-4 w-full"
        title="Player form"
        subTitle="The graph shows the form of the attack over time."
      >
        <PrimeChart
          id={"line-" + playerData?.id.toString()}
          type="line"
          data={lineChart}
          options={{
            animation: { duration: 0 },
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
              legend: {
                labels: {
                  color: "#495057",
                },
              },
            },
            scales: {},
          }}
        />
      </Card>

      <div className="flex align-items-start justify-content-between gap-4">
        <Card
          className="line-chart flex p-4 w-full"
          title="Game phases"
          subTitle="The graph shows the success ratio in the three phases of a football match. The success of the defending, attacking and passing phases is indicated."
        >
          <PrimeChart
            id={playerData?.id.toString()}
            type="pie"
            data={pieChart}
            options={{
              animation: { duration: 0 },
              plugins: {
                legend: {
                  labels: {
                    color: "#495057",
                  },
                },
              },
            }}
          />
        </Card>

        <Card
          className="flex w-full"
          title="Correlation"
          subTitle="The graph shows the correlation between the individual performance of each player and the result of the match.
Four parameters are analyzed: minutes played, goals, assists and a clean sheet.
A darker heatmap means that the correlation between datasets is higher."
        >
          {!loaders.chartData ? (
            <div className="heat-charts w-full h-auto">
              {charts?.map((chart, i) => (
                <Chart
                  options={HEATMAP_CHART_OPTIONS}
                  key={"chart-" + i}
                  series={chart.series}
                  type="heatmap"
                  width="100%"
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-2">
              <Skeleton shape="rectangle" height="10vw" width="20vw" />
              <Skeleton shape="rectangle" height="10vw" width="20vw" />
              <Skeleton shape="rectangle" height="10vw" width="20vw" />
              <Skeleton shape="rectangle" height="10vw" width="20vw" />
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default DetailedPlayer;
