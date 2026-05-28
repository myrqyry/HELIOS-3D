# HELIOS-3D Data

This folder contains synthetic placeholder data for plotting and validation pipelines. **None of these files represent experimental or simulation-backed performance evidence.**

## Schema

### `erc_core_temp_tolerance.synthetic.csv`

| Column | Type | Bounds | Description |
|---|---|---|---|
| `time` | float | ≥ 0.0 | Simulation time step |
| `temperature_variance` | float | [-1.0, 1.0] | Temperature deviation from nominal (K) |
| `accuracy` | float | [0.0, 1.0] | ERC classification accuracy |

Validated by `analysis/validate_erc_data.py`.