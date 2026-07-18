'use client'

import { useEffect } from 'react'

import { markPostAsRead } from '../stores/read-posts'

type ReadPostTrackerProps = {
  postKey: string
}

const ReadPostTracker = ({ postKey }: ReadPostTrackerProps) => {
  useEffect(() => {
    markPostAsRead(postKey)
  }, [postKey])

  return null
}

export default ReadPostTracker
