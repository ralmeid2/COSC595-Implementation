import React, { useEffect, useState } from 'react';
import styles from './DailyNotices.module.css';
import {DailyNotice} from "../types";

export default function DailyNoticesView({ noticesData, isLoading }: DailyNoticesProps) {

  if (isLoading) {
    return <p>Loading notices...</p>;
  }

  if (!noticesData) {
    return <p>No notices available</p>;
  }

  const notices = []

  // Go through each notice and check if it is valid for today
  for (let notice of noticesData) {
    // Get the start and end dates
    const startDate = new Date(notice.startDate)
    const endDate = new Date(notice.expiryDate)

    // Check if today is between the start and end dates
    if (startDate <= new Date() && endDate >= new Date()) {
      notices.push(notice)
    }
  }

  // Sort the notices by start date
  notices.sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  })

    // Otherwise, display the notices
    return (
      <div className={styles.noticesContainer}>
        <div className={styles.title}>Today's Notices</div>
        <div className={styles.noticesInfoContainer}>
          {notices.map((notice) => (
            <div className={styles.notice}>
              <div className={styles.noticeTitle}>{notice.title}</div>
              <div className={styles.noticeContent}>{notice.message}</div>
            </div>
          ))}
        </div>
      </div>
    )



}

interface DailyNoticesProps {
    noticesData: Array<DailyNotice>
    isLoading: boolean;
}


