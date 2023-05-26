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

const ReportsPreview = ({ message, query = "", searchParameter = "" }) => {
    const [reports, setReports] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const [reportCount, setReportCount] = useState(0)
    const { pathname } = useLocation();
    const search = query !== "" ? `${searchParameter}=${query}&` : ""
    useEffect(() => {


        const fetchReports = async () => {
            try {
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
                <>
                    <span className={styles.Count}>{reportCount} results</span>
                    {reports.results.length ? (
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
                        <Container>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </>
    )
}

export default ReportsPreview