"use client"

import { motion } from "framer-motion"
import { LogOut, Search, ChevronUp, ChevronDown, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

interface ContactData {
  id?: number
  name?: string
  company?: string
  email?: string
  phone?: string
  interest?: string
  website?: string
  [key: string]: any
}   

type SortField = keyof ContactData
type SortOrder = "asc" | "desc"

// Column name mappings
const columnNames: Record<string, string> = {
  id: "ID",
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  interest: "Interest",
  website: "Website",
  createdAt: "Created At",
  created_at: "Created At",
  updatedAt: "Updated At",
  updated_at: "Updated At",
}

// Format date and time
const formatDateTime = (value: any): string => {
  if (!value) return "-"
  try {
    const date = new Date(value)
    if (isNaN(date.getTime())) return String(value)
    
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date)
  } catch {
    return String(value)
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<ContactData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "https://acra-web-3k2w.vercel.app/api/get")
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const result = await response.json()
      setData(Array.isArray(result) ? result : result.data || [])
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to load data")
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    router.push("/login")
  }

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const searchLower = searchQuery.toLowerCase()
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchLower)
    )
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField] ?? ""
    const bValue = b[sortField] ?? ""

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const columns = data.length > 0 ? Object.keys(data[0] || {}) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AKRA Dashboard
            </h1>
          </motion.div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title and Search */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Contacts Data
              </h2>
              <p className="text-muted-foreground">
                Manage and view all contact submissions
              </p>  
            </div> 

            {/* Search bar on the right */}
            <motion.div
              className="relative sm:w-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by any field..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-card border border-border text-foreground placeholder:text-muted-foreground/50 rounded-xl px-4 pl-12 transition-all duration-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Failed to load data: {error}
              <Button
                onClick={fetchData}
                size="sm"
                variant="outline"
                className="ml-4"
              >
                Retry
              </Button>
            </motion.div>
          )}

          {/* Loading state */}
          {isLoading && (
            <motion.div
              className="flex items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader className="h-6 w-6 text-primary animate-spin" />
              <span className="ml-2 text-muted-foreground">Loading data...</span>
            </motion.div>
          )}

          {/* Table */}
          {!isLoading && data.length > 0 && (
            <motion.div
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-primary/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Table header info */}
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{sortedData.length}</span> of{" "}
                  <span className="font-semibold text-foreground">{data.length}</span> entries
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  div::-webkit-scrollbar { 
                    display: none;
                  }
                `}</style>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      {columns.map((column) => (
                        <th
                          key={column}
                          onClick={() => handleSort(column as SortField)}
                          className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span>{columnNames[column] || column.charAt(0).toUpperCase() + column.slice(1)}</span>
                            {sortField === column && (  
                              sortOrder === "asc" ? (
                                <ChevronUp className="h-4 w-4 text-primary" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-primary" />
                              )
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.length > 0 ? (
                      sortedData.map((row, idx) => (
                        <motion.tr
                          key={idx}
                          className="border-b border-border hover:bg-muted/30 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          {columns.map((column) => {  
                            const isDateField = ['createdAt', 'created_at', 'updatedAt', 'updated_at'].includes(column);
                            const value = isDateField ? formatDateTime(row[column]) : String(row[column] || "-");
                            return (
                              <td
                                key={`${idx}-${column}`}
                                className="px-6 py-4 text-sm text-muted-foreground"
                              >
                                <div className="max-w-xs truncate">
                                  {value}
                                </div>
                              </td>
                            );
                          })}
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-6 py-8 text-center text-muted-foreground"
                        >
                          No results found for "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Empty state */}
          {!isLoading && data.length === 0 && !error && (
            <motion.div
              className="text-center py-12 bg-card border border-border rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground mb-4">No data available</p>
              <Button onClick={fetchData} variant="outline">
                Refresh
              </Button>
            </motion.div>
          )}

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link href="/">
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
