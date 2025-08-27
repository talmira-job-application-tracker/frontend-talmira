export type AlertType = {
  _id: string
  message: string
  isRead: boolean
  jobId: {
    _id: string
    title: string
    location: string
    jobType: string
    workMode: string
    description: string
  }
  createdAt: string
}