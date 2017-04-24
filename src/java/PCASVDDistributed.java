/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Aatish Bansal
 */
import com.intel.daal.algorithms.pca.*;
import com.intel.daal.algorithms.PartialResult;
import com.intel.daal.data_management.data.NumericTable;
import com.intel.daal.data_management.data.HomogenNumericTable;
import com.intel.daal.data_management.data_source.FileDataSource;
import com.intel.daal.data_management.data_source.DataSource;
import com.intel.daal.services.*;
/*
 // Principal component analysis computation example program text.
 */
class PCASVDDistributed {
    /* Input data set parameters */
    private static final String[] dataset = { "../data/distributed/pca_normalized_1.csv",
                                              "../data/distributed/pca_normalized_2.csv",
                                              "../data/distributed/pca_normalized_3.csv",
                                              "../data/distributed/pca_normalized_4.csv",
                                            };
    private static final int nVectorsInBlock = 250;
    private static final int nNodes = 4;
    private static int nFeatures;
    private static PartialResult[] pres = new PartialResult[nNodes];
    private static DaalContext context = new DaalContext();
    public static void main(String[] args) throws java.io.FileNotFoundException, java.io.IOException {
        for (int i = 0; i < nNodes; i++) {
            /* Initialize FileDataSource to retrieve input data from .csv file */
            FileDataSource dataSource = new FileDataSource(context, dataset[i],
                                                           DataSource.DictionaryCreationFlag.DoDictionaryFromContext,
                                                           DataSource.NumericTableAllocationFlag.DoAllocateNumericTable);
            nFeatures = (int)dataSource.getNumberOfColumns();
            /* Retrieve input data */
            dataSource.loadDataBlock(nVectorsInBlock);
            /* Create algorithm to calculate PCA decomposition using SVD method on local nodes*/
            DistributedStep1Local pcaLocal = new DistributedStep1Local(context, Double.class, Method.svdDense);
            /* Set input data on local node */
            NumericTable data = dataSource.getNumericTable();
            pcaLocal.input.set(InputId.data, data);
            /* Compute PCA on local node */
            pres[i] = pcaLocal.compute();
        }
        /* Create algorithm to calculate PCA decomposition using SVD method on master node */
        DistributedStep2Master pcaMaster = new DistributedStep2Master(context, Double.class, Method.svdDense);
        /* Add partial results computed on local nodes to the algorithm on master node */
        for (int i = 0; i < nNodes; i++) {
            pcaMaster.input.add(MasterInputId.partialResults, pres[i]);
        }
        /* Compute PCA on master node */
        pcaMaster.compute();
        /* Finalize the computations and retrieve PCA results */
        Result res = pcaMaster.finalizeCompute();
        NumericTable eigenValues = res.get(ResultId.eigenValues);
        NumericTable eigenVectors = res.get(ResultId.eigenVectors);
        Service.printNumericTable("Eigenvalues:", eigenValues);
        Service.printNumericTable("Eigenvectors:", eigenVectors);
        context.dispose();
    }
}