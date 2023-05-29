import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
import { Container } from "react-bootstrap";
import NoResults from '../../assets/no-results.png'
import Asset from '../../components/Asset'
import styles from '../../styles/ReportsPreview.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchMoreData } from '../../utils/utils'
import ReportCard from './ReportCard';

/**
 * Display the reports according to the filteres passed in the searchReportsPage
 * if no filters were passed all reports will be displayed
 */
const ReportsPreview = ({ message, query = "", searchParameter = "" }) => {
    const [reports, setReports] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const [reportCount, setReportCount] = useState(0)
    const { pathname } = useLocation();
    //import filter data to create a specific endpoint if the user selectd filter options
    const search = query !== "" ? `${searchParameter}=${query}&` : ""
    useEffect(() => {

        // fetch reports from api
        const fetchReports = async () => {
            try {
                // if the user applied filters an endpoint using this will fetch the data. 
                // Otherise all reports will be fetched
                const { data } = await axiosReq.get(`/reports/?${search}$`)
                setReports(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchReports()
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [pathname, query, search])

    useEffect(() => {
        setReportCount(reports.count)
    }, [reports])

    return (
        <>
            {hasLoaded ? (
                //if the data has loaded all reports will be displayed here
                <>
                    <span className={styles.Count}>{reportCount} results</span>
                    {reports.results.length ? (
                        // if there are reports fetched they will be infinitely displayed
                        // using infinite scroll using a card format
                        <div className={styles.InfiniteScrollContainer}>
                            <InfiniteScroll
                                children={
                                    reports.results.map((report) => (
                                        <ReportCard key={report.id} {...report} setReports={setReports} reportCount={reportCount} setReportCount={setReportCount} />
                                    ))
                                }
                                dataLength={reports.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!reports.next}
                                next={() => fetchMoreData(reports, setReports)}
                            />
                        </div>
                    ) : (
                        // if there are no reports fetched the no results asset will be displayed
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                // display loader until list data is fetched
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </>
    )
}

export default ReportsPreview