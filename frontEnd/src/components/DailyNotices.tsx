import React, { useEffect, useState } from 'react';
import styles from './DailyNotices.module.css';
import {DailyNotice} from "../types";

const NOTICES_PER_PAGE = 5; // Number of notices to display per page
const NOTICE_DISPLAY_TIME = 5000; // Time to display each notice in milliseconds

/**
 * Displays the daily notices
 * @param noticesData Array of DailyNotice objects
 * @param isLoading Whether the notices are still loading
 * @param isFullScreen Whether the notices are displayed in full screen
 * Can change the number of notices displayed per page and the time to display each notice by changing the constants
 * TODO: Change it to dynamically show the number of notices per page based on the length of the notices
 */
export default function DailyNoticesView({ isFullScreen, noticesData, isLoading }: DailyNoticesProps) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [noticePages, setNoticePages] =
    // DailyNotice[][] is a 2D array of DailyNotice, an array containing arrays of DailyNotices for each page
    useState<DailyNotice[][]>([]);

  useEffect(() => {
    // Filter notices that are valid for today
    const validNotices = noticesData.filter((notice) => {
      const startDate = new Date(notice.startDate);
      const endDate = new Date(notice.expiryDate);
      return startDate <= new Date() && endDate >= new Date();
    });

    // Sort notices by start date (descending)
    validNotices.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    // Divide notices into pages
    const pages = [];
    // i += NOTICES_PER_PAGE means it will create a new page every NOTICES_PER_PAGE notices
    for (let i = 0; i < validNotices.length; i += NOTICES_PER_PAGE) {
      pages.push(validNotices.slice(i, i + NOTICES_PER_PAGE)); // Will take NOTICES_PER_PAGE notices from validNotices starting from index i
    }

    setNoticePages(pages);
  }, [noticesData]); // Only run this effect when noticesData changes (i.e. when notices are fetched)

  // Change notice page every NOTICE_DISPLAY_TIME milliseconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % noticePages.length);
    }, NOTICE_DISPLAY_TIME);

    return () => clearInterval(timer);
  }, [noticePages]);


  if (isLoading) {
    return <p>Loading notices...</p>;
  }

  if (!noticesData) {
    return <p>No notices available</p>;
  }

  const containerStyle = isFullScreen? styles.fullScreen : styles.multiScreen

  return (
    <div className={containerStyle}>
      <div className={styles.title}>Today's Notices</div>
      <div className={styles.noticesInfoContainer}>
        {/* Only map the notices of the notice array that is the current index (the current page) */}
        {/* '&&' operator is used to check if the array is not empty before mapping, JSX cannot do 'if' statements,
         please see
         https://legacy.reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator and
         https://react.dev/learn/conditional-rendering#logical-and-operator-*/}
        {noticePages.length > 0 &&
          noticePages[currentIndex].map((notice, index) => (
          <div className={styles.notice} key={index}>
            <div className={styles.noticeTitle}>{notice.title}</div>
            <div className={styles.noticeContent}>{notice.message}</div>
          </div>
        ))}
      </div>
      <div className={styles.indicatorContainer}>
        {noticePages.map((page, index) => (
          <div key={index} className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}></div>
        ))}
      </div>
    </div>
  );
}

interface DailyNoticesProps {
  noticesData: Array<DailyNotice>
  isLoading: boolean;
  isFullScreen: boolean;
}
