import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, StyleSheet, BlobProvider, View } from '@react-pdf/renderer';
import { toast } from 'react-toastify';

import AttendanceReport from './attendancecomponents/AttendanceReport';
import AttendanceService from '../services/AttendanceService';

const ParentComponent = () => {
  const [pdfBlob, setPdfBlob] = useState(null);

  const onGenerateReport = (standard, section, attendanceDate) => {
    AttendanceService.generateAttendanceReport(standard, section, attendanceDate)
      .then((response) => {
        const data = response.data;
        console.log('Response Data:', data); // Log the response data
        toast.success(" Attendance Report Generated Sucessfully");

        const MyDocument = () => (
          <Document>
            <Page style={styles.page}>
              <View style={styles.header}>
                <Text style={styles.title}>Attendance Report</Text>
                <br />
                <Text style={styles.subtitle}>
                  Standard: {standard}, Section: {section}, Date: {attendanceDate}
                </Text>
              </View>

              <View style={styles.content}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Attendance Summary</Text>
                  <Text style={styles.summaryText}>Total Number of Students: {data['Total Number of Students']}</Text>
                  <Text style={styles.summaryText}>No of Students Present: {data['No of Students Present']}</Text>
                  <Text style={styles.summaryText}>No of Students Absent: {data['No of Students Absent']}</Text>
                </View>

                {data['No of Students Present'] > 0 && data['List of Students Present'] && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>List of Students Present:</Text>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Student ID</Text>
                        <Text style={styles.tableHeader}>Student Name</Text>
                      </View>
                      {Object.entries(data['List of Students Present']).map(([id, name], index) => (
                        <View
                          key={id}
                          style={[
                            styles.tableRow,
                            index % 2 === 0 ? { backgroundColor: '#f9f9f9' } : null,
                          ]}
                        >
                          <Text style={styles.tableCell}>{id}</Text>
                          <Text style={styles.tableCell}>{name}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {data['No of Students Absent'] > 0 && data['List of Students Absent'] && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>List of Students Absent:</Text>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Student ID</Text>
                        <Text style={styles.tableHeader}>Student Name</Text>
                      </View>
                      {Object.entries(data['List of Students Absent']).map(([id, name], index) => (
                        <View
                          key={id}
                          style={[
                            styles.tableRow,
                            index % 2 === 0 ? { backgroundColor: '#f9f9f9' } : null,
                          ]}
                        >
                          <Text style={styles.tableCell}>{id}</Text>
                          <Text style={styles.tableCell}>{name}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </Page>
          </Document>
        );

        setPdfBlob(
          <BlobProvider document={<MyDocument />} fileName="attendance_report.pdf">
            {({ blob, url, loading, error }) => {
              if (loading) {
                return 'Generating PDF...';
              }
              if (error) {
                return `Error generating PDF: ${error.message}`;
              }
              if (blob) {
                const downloadUrl = URL.createObjectURL(blob);
                return (
                  <a href={downloadUrl} download="attendance_report.pdf" style={{ color: 'white',fontWeight:'bold' }}> Download Report.pdf </a>
                );
              }
              return null;
            }}
          </BlobProvider>
        );
      })
      .catch((error) => {
        console.error('Error generating attendance report:', error);
      });
  };

  return (
    <div>
      <AttendanceReport onGenerateReport={onGenerateReport} />
      <br />
      {pdfBlob && <div className="pdf-container">{pdfBlob}</div>}
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#4a4a4a',
    padding: '20pt 20pt 20pt 20pt',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: '30pt',
  },
  title: {
    fontSize: '24pt',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
    marginBottom: '20pt',
  },
  subtitle: {
    fontSize: '12pt',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  content: {
    backgroundColor: 'white',
    padding: '20pt',
  },
  section: {
    marginBottom: '20pt',
  },
  sectionTitle: {
    fontSize: '15pt',
    fontWeight: 'bold',
    marginBottom: '10pt',
  },
  summaryText: {
    fontSize: '12pt',
    marginBottom: '5pt',
  },
  studentName: {
    fontSize: '12pt',
    marginBottom: '5pt',
  },
  table: {
    display: 'table',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderColor: '#000',
    backgroundColor: '#f2f2f2',
  },
  tableHeader: {
    width: '50%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingRight: 3,
    borderColor: '#000',
    padding: 3,
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableCell: {
    width: '50%',
    padding: 3,
    borderColor: '#000',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 3,
    fontSize: 10,
  },
});

export default ParentComponent;
